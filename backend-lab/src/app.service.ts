import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema para el Laboratorio de Análisis del Hospital Municipal Gumersindo Sayago';
  }
}
