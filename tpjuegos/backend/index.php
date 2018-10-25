<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT as JWT;

require 'vendor/autoload.php';
require 'verificadora.php';
require 'mw.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->group('/estadistica', function (){
        
    $this->get('/', function (Request $request, Response $response, array $args){
        $listaMedias=Verificadora::TraerEstadistica($request,$response);
        return $response->withJson($listaMedias,200);
    });
});

$app->group('/usuarios', function (){
        
    $this->post('/', function (Request $request, Response $response) {
        Verificadora::AltaRegistro($request,$response);
        Verificadora::AltaEstadistica($request,$response);
    });
    $this->delete('/', function (Request $request, Response $response) {
        $esPropietario=Middlewares::ValidarAccesoPropietario($request,$response);
        if($esPropietario || $esEncargado)
        {
            return Verificadora::EliminarEmpleado($request,$response);
        }
        else
        {
            return $response->withJson((["mensaje"=>"sin permisos"]),200);
        }
    });
});

$app->post('/', function (Request $request, Response $response, array $args){
    return Verificadora::ModEstadistica($request,$response);
});

$app->group('/login', function (){    
    $this->post('/', function (Request $request, Response $response, array $args){
        $json=$request->getParsedBody();
        $jsonDes= json_decode($json['json']);
        $correo=$jsonDes->correo;
        $clave=$jsonDes->clave;
        $key = "example_key";
        $fecha = time();
        $payload=array(
            "correo"=> $correo,
            "clave"=> $clave,
            "iat"=> $fecha,
            "exp"=> $fecha+1000
        );
        $jwt = JWT::encode($payload, $key);
        http_response_code(200);
        return json_encode($jwt);
    })->add(\Verificadora::class.':VerificarUsuario');

    $this->get('/', function (Request $request, Response $response, array $args){
        return $response->withJson((["mensaje"=>"todoOk"]),200);
    })->add(\Verificadora::class.':ValidarToken');
});

$app->delete('/', function (Request $request, Response $response, array $args){
    $esEncargado=Middlewares::ValidarAccesoEncargado($request,$response);
    $esPropietario=Middlewares::ValidarAccesoPropietario($request,$response);
    if($esPropietario || $esEncargado)
    {
        return Verificadora::EliminarMedia($request,$response);
    }
    else
    {
        return $response->withJson((["mensaje"=>"sin permisos"]),200);
    }
    return $response->withJson($listaUsuarios,200);
})->add(\Verificadora::class.':ValidarToken');

$app->put('/', function (Request $request, Response $response, array $args){
    $esEncargado=Middlewares::ValidarAccesoEncargado($request,$response);
    $esPropietario=Middlewares::ValidarAccesoPropietario($request,$response);
    if($esPropietario || $esEncargado)
    {
        return Verificadora::ModificarMedia($request,$response);
    }
    else
    {
        return $response->withJson((["mensaje"=>"sin permisos"]),200);
    }
    return $response->withJson($listaUsuarios,200);
})->add(\Verificadora::class.':ValidarToken');


$app->run();

?>