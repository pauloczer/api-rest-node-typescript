import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';

import { CidadesController, PessoasController, UsuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';





const router = Router();


router.get('/', (_, res) => {
  return res.send('Olá, Dev');
});

//Cidades
router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);


//Pessoas
router.get('/pessoas', ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

//User
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/registar', UsuariosController.signUpValidation, UsuariosController.signUp);


export {router};