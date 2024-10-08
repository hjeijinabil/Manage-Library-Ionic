import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementBookService } from '../management-book.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {
  bookId: string | null = null;
  bookForm!: FormGroup;  // Declare the form group

  constructor(
    private route: ActivatedRoute,
    private bookService: ManagementBookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loadBookDetails();
    }

    // Initialize the form group
    this.bookForm = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      genre: new FormControl(''),
      publishedDate: new FormControl(''),
      summary: new FormControl(''),
    });
  }

  loadBookDetails() {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((data) => {
        // Set the form values with the loaded book data
        this.bookForm.setValue({
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          genre: data.genre,
          publishedDate: data.publishedDate,
          summary: data.summary,
        });
      });
    }
  }

  saveChanges() {
    if (this.bookForm.valid) {
      const updatedBook = this.bookForm.value;
      updatedBook.id = this.bookId;  // Ensure the bookId is included

      this.bookService.updateBook(updatedBook).then(() => {
        this.router.navigate(['/management-book']);  // Redirect after save
      }).catch(err => {
        console.error('Error saving book', err);
        // Handle error, maybe show a message
      });
    }
  }

  cancel() {
    this.router.navigate(['/management-book']);  // Cancel and go back
  }
}
