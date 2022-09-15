import { MapeamentoService } from './service/mapeamento.service';
import { MapeamentoController } from './controller/mapeamento.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaController } from './controller/persona.controller';
import { PersonaSchema } from './schema/persona.schema';
import { PersonaService } from './service/persona.service';
import { MapeamentoSchema } from './schema/mapeamento.schema';
import { PersonaTemplateSchema } from './schema/personaTemplate.schema';
import { PersonaTemplateController } from './controller/personaTemplate.controller';
import { PersonaTemplateService } from './service/personaTemplate.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://geradormassa:KcuGq9X6aq9bGLy0@cluster0.j36ngzf.mongodb.net/?retryWrites=true&w=majority',
    ),

    MongooseModule.forFeature([
      { name: 'Persona', schema: PersonaSchema },
      { name: 'Mapeamento', schema: MapeamentoSchema },
      { name: 'PersonaTemplate', schema: PersonaTemplateSchema },
    ]),
  ],
  controllers: [
    MapeamentoController,
    AppController,
    PersonaController,
    PersonaTemplateController,
  ],
  providers: [MapeamentoService, AppService,  PersonaService, PersonaTemplateService],
})
export class AppModule {}
