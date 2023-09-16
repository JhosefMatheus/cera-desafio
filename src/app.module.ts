import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { JwtModule } from '@nestjs/jwt';
import { PerfilModule } from './perfil/perfil.module';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.143p2al.mongodb.net/cera'),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '1d'
        }
      })
    }),
    GuardsModule,
    AutenticacaoModule,
    PerfilModule
  ]
})
export class AppModule {}
