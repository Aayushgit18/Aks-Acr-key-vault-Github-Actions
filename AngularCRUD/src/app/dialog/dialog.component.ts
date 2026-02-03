import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  actionBtn = 'Save';
  statusList = ['on reading', 'finished reading', 'not yet read'];
  bookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      isbn: ['', Validators.required],
      topic: ['', Validators.required],
      publicationDate: ['', Validators.required],
      status: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.bookForm.patchValue(this.editData);
    }
  }

  addBook() {
    if (!this.editData && this.bookForm.valid) {
      this.api.postBook(this.bookForm.value).subscribe({
        next: () => {
          alert('Book added successfully');
          this.dialogRef.close('save');
        },
        error: () => alert('Error while adding the book'),
      });
    } else {
      this.updateBook();
    }
  }

  updateBook() {
    this.api.putBook(this.bookForm.value, this.editData.bookId).subscribe({
      next: () => {
        alert('Book updated successfully');
        this.dialogRef.close('update');
      },
      error: () => alert('Error while updating the book'),
    });
  }
}

