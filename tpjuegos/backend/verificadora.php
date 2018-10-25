<?php
    use \Firebase\JWT\JWT as JWT;

    class Verificadora
    {
        public function AltaRegistro($request,$response)
        {
            $json=$request->getParsedBody();
            $jsonDes= json_decode($json['json']);
            $nombre=$jsonDes->nombre;
            $correo=$jsonDes->correo;
            $clave=$jsonDes->clave;

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=tpjuegos;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `usuarios`(`nombre`,`correo`,`clave`) VALUES (:nombre,:correo,:clave)');
                
                $sql->execute(array(
                    'correo' => $correo,
                    'clave' => $clave,
                    'nombre' => $nombre,
                    
                ));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }

        public function VerificarUsuario($request,$response,$next)
        {
            $json=$request->getParsedBody();
            $jsonDes= json_decode($json['json']);
            $correo=$jsonDes->correo;
            $clave=$jsonDes->clave;
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=tpjuegos;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('SELECT `correo`,`clave` FROM `usuarios` WHERE `correo` = :correo AND `clave` = :clave');
                $sql->bindValue(':correo', $correo);
                $sql->bindValue(':clave', $clave);
                $sql->execute();
                $result = $sql->rowCount();
                if($result)
                { 
                    $response = $next($request, $response);
                }
                else
                {
                    return $response->withJson((["mensaje"=>"Datos de logeo incorrectos"]));
                }
            }
            catch(PDOException $e)
            {
                return "Error!\n" . $e->getMessage();
            }
            return $response;
        }

        public function ValidarToken($request,$response,$next)
        {
            $elToken= $request->getHeader('miToken');
            try
            {
                $jwtDecode = JWT::decode($elToken[0],'example_key',array('HS256'));
                $response = $next($request, $response);
                return $response;
            }
            catch(Exception $e)
            {
                return $response->withJson((["mensaje"=>"token invalido"]),200);
            }
        }

        public static function TraerEstadistica($request,$response)
        {
            $arrayEmpleados=array();
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=tpjuegos;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('SELECT * FROM `estadisticas`');
                $sql->execute();
                while($result = $sql->fetchObject())
                {
                    array_push($arrayEmpleados,$result);
                }
            }
            catch(PDOException $e)
            {
                echo "Error!\n" . $e->getMessage();
            }
            return $arrayEmpleados;
        }

        

        public function AltaEstadistica($request,$response)
        {
            $json=$request->getParsedBody();
            $jsonDes= json_decode($json['json']);
            $correo=$jsonDes->correo;

            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=tpjuegos;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('INSERT INTO `estadisticas`(`correo`) VALUES (:correo)');
                
                $sql->execute(array(
                    'correo' => $correo,
                ));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }
        }

        public function ModEstadistica($request,$response)
        {
            $json=$request->getParsedBody();
            $jsonDes= json_decode($json['json']);
            $correo=$jsonDes->correo;
            $juego=$jsonDes->juego;
            $cuanto=$jsonDes->cuanto;
            try
            {
                $usuario='root';
                $pass='';
                $objetoPDO = new PDO('mysql:host=localhost;dbname=tpjuegos;charset=utf8', $usuario, $pass);
                $sql=$objetoPDO->prepare('UPDATE `estadisticas` SET '.$juego.'='.$juego.'+'.$cuanto.' WHERE `correo`=:correo');
                
                $sql->execute(array(
                    'correo' => $correo
                ));
            }
            catch(PDOException $e) 
            {
                return $response->withJson((["error"=>$e->getMessage()]));
            }            
        }

    }
    
?>