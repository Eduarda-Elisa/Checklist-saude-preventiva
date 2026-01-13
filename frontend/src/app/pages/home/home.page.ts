import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService, Notification } from '../../services/notification.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  currentUser: User | null = null;
  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadNotifications();
      }
    });
  }

  loadNotifications() {
    this.notificationService.checkNotifications();
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications.sort((a, b) => a.daysUntil - b.daysUntil);
      this.unreadCount = this.notificationService.getUnreadCount();
    });
  }

  getNotificationMessage(notification: Notification): string {
    if (notification.daysUntil === 0) {
      return `HOJE: ${notification.examName}`;
    } else if (notification.daysUntil === 1) {
      return `AMANHÃ: ${notification.examName}`;
    } else {
      return `Em ${notification.daysUntil} dias: ${notification.examName}`;
    }
  }

  getNotificationColor(notification: Notification): string {
    if (notification.type === 'urgent') return 'danger';
    if (notification.type === 'warning') return 'warning';
    return 'primary';
  }

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification.id);
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateToChecklist() {
    if (this.currentUser && this.currentUser.id) {
      this.router.navigate(['/checklist'], { queryParams: { userId: this.currentUser.id } });
    }
  }

  navigateToLembretes() {
    if (this.currentUser && this.currentUser.id) {
      this.router.navigate(['/lembretes'], { queryParams: { userId: this.currentUser.id } });
    }
  }

  logout() {
    this.userService.logout();
  }
}
