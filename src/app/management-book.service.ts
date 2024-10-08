import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, updateDoc, doc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData, docData } from 'rxfire/firestore';
import { AutheticationService } from './authetication.service';

// Define Book class structure
export class Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  genre: string;
  summary: string;
  userId: string; // Add userId to associate books with users

  constructor(title: string, author: string, isbn: string, publishedDate: string, genre: string, summary: string, userId: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publishedDate = publishedDate;
    this.genre = genre;
    this.summary = summary;
    this.userId = userId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ManagementBookService {

  private userId: string;

  constructor(private authService: AutheticationService, private firestore: Firestore) {
    this.authService.getProfile().then(user => {
      this.userId = user.uid;  // Set userId from the auth service
    });
  }

  // Add a new book
  addBook(book: Book) {
    const bookData = Object.assign({}, book);  // Convert Book class instance to a plain object
    bookData.userId = this.userId;  // Ensure the userId is added
    const bookRef = collection(this.firestore, 'books');
    return addDoc(bookRef, bookData);
  }

  // Get books for a specific user
  getBooks(userId: string): Observable<Book[]> {
    const bookRef = collection(this.firestore, 'books');
    const refQuery = query(bookRef, where('userId', '==', userId));
    return collectionData(refQuery, { idField: 'id' }) as Observable<Book[]>;
  }

  // Get a book by its ID
  getBookById(id: string): Observable<Book> {
    const bookRef = doc(this.firestore, `books/${id}`);
    return docData(bookRef, { idField: 'id' }) as Observable<Book>;
  }

  // Update a book
  updateBook(book: Book) {
    const bookRef = doc(this.firestore, `books/${book.id}`);
    return updateDoc(bookRef, {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publishedDate: book.publishedDate, // Fixed property name
      genre: book.genre,
      summary: book.summary
    });
  }

  // Delete a book
  removeBook(id: string) {
    const bookRef = doc(this.firestore, `books/${id}`);
    return deleteDoc(bookRef);
  }
}
