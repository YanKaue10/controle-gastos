import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-notificacao-toast',
  templateUrl: './notificacao-toast.html',
})
export class NotificacaoToast {
  toastService = inject(ToastService);

  cores = {
    sucesso: 'from-emerald-500 to-teal-500',
    erro: 'from-rose-500 to-red-500',
    info: 'from-sky-500 to-indigo-500',
  };
}
