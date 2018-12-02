import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizhawkViewComponent } from './bizhawk-view.component';

describe('BizhawkViewComponent', () => {
  let component: BizhawkViewComponent;
  let fixture: ComponentFixture<BizhawkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizhawkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizhawkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
