import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackholdersComponent } from './stackholders.component';

describe('StackholdersComponent', () => {
  let component: StackholdersComponent;
  let fixture: ComponentFixture<StackholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackholdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
