import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  text: string;
  editing: boolean;
  editText: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
})
export class Home {
  newTodo = '';
  todos = signal<TodoItem[]>([]);
  private nextId = 1;

  addTodo(): void {
    const text = this.newTodo.trim();
    if (!text) return;
    this.todos.update((list) => [
      ...list,
      { id: this.nextId++, text, editing: false, editText: text },
    ]);
    this.newTodo = '';
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
