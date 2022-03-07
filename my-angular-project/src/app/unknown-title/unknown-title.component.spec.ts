import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownTitleComponent } from './unknown-title.component';

describe('UnknownTitleComponent', () => {
  let component: UnknownTitleComponent;
  let fixture: ComponentFixture<UnknownTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
