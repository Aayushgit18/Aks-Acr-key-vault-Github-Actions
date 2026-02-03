import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'bookName',
    'isbn',
    'topic',
    'publicationDate',
    'status',
    'price',
    'comment',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value === 'save') {
          this.getAllBooks();
        }
      });
  }

  getAllBooks() {
    this.api.getBooks().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        alert('Error while fetching the records!');
      },
    });
  }

  editBook(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((value: any) => {
        if (value === 'update') {
          this.getAllBooks();
        }
      });
  }

  deleteBook(bookId: number) {
    this.api.deleteBook(bookId).subscribe({
      next: (response: any) => {
        alert('Book deleted successfully');
        this.getAllBooks();
      },
      error: (error: any) => {
        alert('Error while deleting book');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

