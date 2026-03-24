import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  editing: boolean;
  editText: string;
}

const STORAGE_KEY = 'ngtodo_todos';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
})
export class Home {
  newTodo = '';
  todos = signal<TodoItem[]>(this.loadFromStorage());
  private nextId: number;

  totalCount = computed(() => this.todos().length);
  pendingCount = computed(() => this.todos().filter((t) => !t.completed).length);
  completedCount = computed(() => this.todos().filter((t) => t.completed).length);

  sortedTodos = computed(() => {
    const list = this.todos();
    return [
      ...list.filter((t) => !t.completed),
      ...list.filter((t) => t.completed),
    ];
  });

  constructor() {
    this.nextId = this.todos().reduce((max, t) => Math.max(max, t.id), 0) + 1;
    effect(() => {
      this.saveToStorage(this.todos());
    });
  }

  private loadFromStorage(): TodoItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as TodoItem[];
      return parsed.map((t) => ({ ...t, editing: false, editText: t.text }));
    } catch {
      return [];
    }
  }

  private saveToStorage(todos: TodoItem[]): void {
    const toSave = todos.map(({ editing: _editing, editText: _editText, ...rest }) => rest);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }

  addTodo(): void {
    const text = this.newTodo.trim();
    if (!text) return;
    this.todos.update((list) => [
      ...list,
      { id: this.nextId++, text, completed: false, editing: false, editText: text },
    ]);
    this.newTodo = '';
  }

  toggleTodo(id: number): void {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  deleteTodo(id: number): void {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }

  startEdit(todo: TodoItem): void {
    this.todos.update((list) =>
      list.map((t) =>
        t.id === todo.id ? { ...t, editing: true, editText: t.text } : t,
      ),
    );
  }

  saveEdit(todo: TodoItem): void {
    const text = todo.editText.trim();
    if (!text) return;
    this.todos.update((list) =>
      list.map((t) =>
        t.id === todo.id ? { ...t, text, editing: false } : t,
      ),
    );
  }

  cancelEdit(todo: TodoItem): void {
    this.todos.update((list) =>
      list.map((t) =>
        t.id === todo.id ? { ...t, editing: false, editText: t.text } : t,
      ),
    );
  }

  onKeydown(event: KeyboardEvent, todo: TodoItem): void {
    if (event.key === 'Enter') this.saveEdit(todo);
    if (event.key === 'Escape') this.cancelEdit(todo);
  }
}
