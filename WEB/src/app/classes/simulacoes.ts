export class Simulacoes {

  ComingSoon?: boolean;
  Title!: string;
  Year!: string;
  Rated!: string;
  Released!: string;
  Runtime!: string;
  Genre!: string;
  Director!: string;
  Writer!: string;
  Actors!: string;
  Plot!: string;
  Language!: string;
  Country!: string;
  Awards!: string;
  Metascore!: string;
  imdbRating!: string;
  imdbVotes!: string;
  imdbID!: string;
  Type!: string;
  Response!: string;
  Images!: string;

  constructor(simulacao: object) {
    simulacao && Object.assign(this, simulacao)
  }

}
