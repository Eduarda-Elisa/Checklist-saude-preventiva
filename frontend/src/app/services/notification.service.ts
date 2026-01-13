import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReminderService } from './reminder.service';
import { UserService } from './user.service';

export interface Notification {
  id: string;
  reminderId: string;
  examName: string;
  date: string;
  daysUntil: number;
  type: 'urgent' | 'warning' | 'info';
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor(
    private reminderService: ReminderService,
    private userService: UserService
  ) {
    this.startNotificationCheck();
  }

  startNotificationCheck() {
    this.checkNotifications();
    setInterval(() => {
      this.checkNotifications();
    }, 60000 * 60);
  }

  checkNotifications() {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser || !currentUser.id) return;

    this.reminderService.getRemindersByUser(currentUser.id).subscribe({
      next: (reminders) => {
        const notifications: Notification[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        reminders.forEach(reminder => {
          if (!reminder.active || !reminder.date) return;

          const reminderDate = new Date(reminder.date);
          reminderDate.setHours(0, 0, 0, 0);
          
          const diffTime = reminderDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays >= 0 && diffDays <= 3) {
            let type: 'urgent' | 'warning' | 'info' = 'info';
            if (diffDays === 0) type = 'urgent';
            else if (diffDays === 1) type = 'urgent';
            else if (diffDays <= 3) type = 'warning';

            notifications.push({
              id: `${reminder.id}-${diffDays}`,
              reminderId: reminder.id || '',
              examName: reminder.examName || reminder.title,
              date: reminder.date,
              daysUntil: diffDays,
              type,
              read: false
            });
          }
        });

        this.notificationsSubject.next(notifications);
      }
    });
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  markAsRead(notificationId: string) {
    const notifications = this.notificationsSubject.value.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(notifications);
  }

  markAllAsRead() {
    const notifications = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(notifications);
  }
}
