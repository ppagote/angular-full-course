import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieStartComponent } from './recipie-start.component';

describe('RecipieStartComponent', () => {
  let component: RecipieStartComponent;
  let fixture: ComponentFixture<RecipieStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipieStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipieStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
