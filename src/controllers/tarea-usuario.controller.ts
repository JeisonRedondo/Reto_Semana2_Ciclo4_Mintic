import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tarea,
  Usuario,
} from '../models';
import {TareaRepository} from '../repositories';

export class TareaUsuarioController {
  constructor(
    @repository(TareaRepository)
    public tareaRepository: TareaRepository,
  ) { }

  @get('/tareas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Tarea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Tarea.prototype.id,
  ): Promise<Usuario> {
    return this.tareaRepository.usuario(id);
  }
}
