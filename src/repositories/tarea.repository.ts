import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Tarea, TareaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class TareaRepository extends DefaultCrudRepository<
  Tarea,
  typeof Tarea.prototype.id,
  TareaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Tarea.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Tarea, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
