import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowTopicComponent } from './follow-topic.component';

describe('FollowTopicComponent', () => {
  let component: FollowTopicComponent;
  let fixture: ComponentFixture<FollowTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
