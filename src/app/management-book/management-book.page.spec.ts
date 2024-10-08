import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagementBookPage } from './management-book.page';

describe('ManagementBookPage', () => {
  let component: ManagementBookPage;
  let fixture: ComponentFixture<ManagementBookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
