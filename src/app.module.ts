import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaController } from './controller/student/persona.controller';
import { StudentController } from './controller/student/student.controller';
import { PersonaSchema } from './schema/persona.schema';
import { StudentSchema } from './schema/student.schema';
import { PersonaService } from './service/persona.service';
import { StudentService } from './service/student.service';
@Module({
  imports:[
      MongooseModule.forRoot('mongodb+srv://geradormassa:KcuGq9X6aq9bGLy0@cluster0.j36ngzf.mongodb.net/?retryWrites=true&w=majority'),

      MongooseModule.forFeature(
        [
            { name: 'Student', schema: StudentSchema }
          , { name: 'Persona', schema: PersonaSchema }])
        ],
  controllers: [AppController,StudentController, PersonaController],
  providers: [AppService,StudentService, PersonaService],
})
export class AppModule {}