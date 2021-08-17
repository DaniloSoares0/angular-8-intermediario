import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/fimes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image_view_fullscreen';

  config: ConfigParams = {
    pagina: 0,
    qtdPagina: 4
  }
  filmes: Filme[] = [];
  fitrosListagem: FormGroup
  generos: Array<String>

  constructor(private filmesService: FilmesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.fitrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.fitrosListagem.get('texto').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
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

  open(id: number): void {
    this.router.navigateByUrl('/filmes/' + id)
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


}


