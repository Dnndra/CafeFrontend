import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchaseDialogComponent } from './confirm-purchase-dialog.component';

describe('ConfirmPurchaseDialogComponent', () => {
  let component: ConfirmPurchaseDialogComponent;
  let fixture: ComponentFixture<ConfirmPurchaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPurchaseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmPurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
