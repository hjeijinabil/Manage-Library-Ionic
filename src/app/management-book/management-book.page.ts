import { Component, OnInit } from '@angular/core';
import { ManagementBookService } from '../management-book.service';
import { ModalController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';

// Define the Book class
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

@Component({
  selector: 'app-management-book',
  templateUrl: './management-book.page.html',
  styleUrls: ['./management-book.page.scss'],
})
export class ManagementBookPage implements OnInit {

  books: Book[] = [];
  title: string = '';
  author: string = '';
  isbn: string = '';
  genre: string = '';
  publicationDate: any;  // Handle properly based on the type you expect
  summary: string = '';
  userId: string | null = '';  // Initialize userId

  constructor(
    private bookService: ManagementBookService, 
    private modalController: ModalController, 
    private authService: AutheticationService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserId();
    this.loadBooks();
  }

  // Load userId after authentication (from AuthService)
  loadUserId() {
    this.authService.getProfile().then(user => {
      this.userId = user.uid;  // Get user ID from authService
      this.loadBooks();  // Load books only after user ID is available
    }).catch(err => {
      console.error('Error loading user profile', err);
      // Handle error, maybe redirect to login or show an alert
    });
  }

  // Load books for the authenticated user
  loadBooks() {
    if (this.userId) {
      this.bookService.getBooks(this.userId).subscribe((data) => {
        this.books = data;
      });
    }
  }

  openBook(book: Book) {
    // Open book details or edit modal
    console.log('Book clicked', book);
    // You can navigate to a detail page or open a modal here
  }

  cancel() {
    this.modalController.dismiss();
  }

  // Confirm and add new book
  confirm() {
    if (!this.userId) {
      console.error('User ID not found!');
      return;
    }
    const newBook = new Book(
      this.userId,  // Get userId from the loaded value
      this.title,
      this.author,
      this.isbn,
      this.publicationDate,
      this.genre,
      this.summary
    );
    this.bookService.addBook(newBook).then(() => {
      this.loadBooks();  // Reload books after adding
      this.modalController.dismiss();
    }).catch(err => {
      console.error('Error adding book', err);
      // Handle the error (e.g., show a message)
    });
  }
  
  // Edit the book
  openEditModal(book: Book) {
    console.log('Opening edit modal for:', book);
    // Assuming you want to navigate to the edit book page
    this.router.navigate(['/edit-book', book.id]);
  }
  // Remove a book
  removeBook(id: string) {
    this.bookService.removeBook(id).then(() => {
      this.loadBooks();  // Reload books after removal
    }).catch(err => {
      console.error('Error removing book', err);
      // Handle error, maybe show a message
    });
  }

  // Logout the user
  logout() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/home');
    }).catch(err => {
      console.error('Error logging out', err);
      // Handle logout error if needed
    });
  }
}
