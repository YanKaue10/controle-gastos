import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'data' })
export class DataPipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor) return '';
    return new Date(valor).toLocaleDateString('pt-BR');
  }
}
