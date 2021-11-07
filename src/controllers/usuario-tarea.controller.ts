import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Tarea,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTareaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/tareas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Tarea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarea)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tarea>,
  ): Promise<Tarea[]> {
    return this.usuarioRepository.tareas(id).find(filter);
  }

  @post('/usuarios/{id}/tareas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarea)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarea, {
            title: 'NewTareaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) tarea: Omit<Tarea, 'id'>,
  ): Promise<Tarea> {
    return this.usuarioRepository.tareas(id).create(tarea);
  }

  @patch('/usuarios/{id}/tareas', {
    responses: {
      '200': {
        description: 'Usuario.Tarea PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarea, {partial: true}),
        },
      },
    })
    tarea: Partial<Tarea>,
    @param.query.object('where', getWhereSchemaFor(Tarea)) where?: Where<Tarea>,
  ): Promise<Count> {
    return this.usuarioRepository.tareas(id).patch(tarea, where);
  }

  @del('/usuarios/{id}/tareas', {
    responses: {
      '200': {
        description: 'Usuario.Tarea DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tarea)) where?: Where<Tarea>,
  ): Promise<Count> {
    return this.usuarioRepository.tareas(id).delete(where);
  }
}
