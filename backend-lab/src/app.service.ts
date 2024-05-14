import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Sistema para el Laboratorio de Análisis de Hospital Municipal Gumersindo Sayago';
  }
}
