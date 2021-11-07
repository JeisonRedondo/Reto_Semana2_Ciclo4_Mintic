import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Tarea} from '../models';
import {TareaRepository} from './tarea.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly tareas: HasManyRepositoryFactory<Tarea, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('TareaRepository') protected tareaRepositoryGetter: Getter<TareaRepository>,
  ) {
    super(Usuario, dataSource);
    this.tareas = this.createHasManyRepositoryFactoryFor('tareas', tareaRepositoryGetter,);
    this.registerInclusionResolver('tareas', this.tareas.inclusionResolver);
  }
}
