import { CampoGenerico } from "./campo-generico";

export interface ConfigParams {
  pagina?: number;
  qtdPagina?: number;
  pesquisa?: string;
  campo?: CampoGenerico;
}
