import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {

    let httpParams = new HttpParams();

    if (config.pagina) {
      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if (config.qtdPagina) {
      httpParams = httpParams.set('_limit', config.qtdPagina.toString())
    }
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa.toString())
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString())
    }

    httpParams = httpParams.set('_sort', 'id')
    httpParams = httpParams.set('_order', 'desc')

    return httpParams;
  }
}
