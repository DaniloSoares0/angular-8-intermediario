import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/fimes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {


  config: ConfigParams = {
    pagina: 0,
    qtdPagina: 4
  }
  filmes: Filme[] = [];
  fitrosListagem: FormGroup
  generos: Array<String>

  constructor(private filmesService: FilmesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fitrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.fitrosListagem.get('texto').valueChanges.subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    })

    this.fitrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: 'genero', valor: val };
      this.resetarConsulta()
    })

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção Cientifica', 'Comédia', 'Drama'];

    this.listarFilmes();
  }

  onScroll() {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes()
  }

  open() {
  }
}
