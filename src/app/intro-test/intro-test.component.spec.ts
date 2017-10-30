import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroTestComponent } from './intro-test.component';

describe('IntroTestComponent', () => {
  let component: IntroTestComponent;
  let fixture: ComponentFixture<IntroTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
