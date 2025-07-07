IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'DICRI_DB')
BEGIN
    CREATE DATABASE DICRI_DB;
END
GO
USE DICRI_DB;


CREATE TABLE [Usuarios] (
    [id_usuario] INT IDENTITY PRIMARY KEY,
    [usuario] NVARCHAR(25) NOT NULL UNIQUE,
    [nombres_de_usuario] NVARCHAR(50) NOT NULL,
    [apellidos_de_usuario] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(100) NOT NULL,
    [telefono] NVARCHAR(20),
    [tipo_de_usuario] NVARCHAR(20) NOT NULL,
    [usuario_activo] BIT NOT NULL DEFAULT 1,
    [fecha_de_creacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [fecha_modificacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [password_hash] NVARCHAR(255) NOT NULL DEFAULT ''
);
GO


CREATE TABLE [Expedientes] (
    [id_expediente] INT IDENTITY PRIMARY KEY,
    [no_expediente] NVARCHAR(50) NOT NULL UNIQUE,
    [Titulo] NVARCHAR(50) NOT NULL,
    [descripcion] NVARCHAR(MAX),
    [fecha_registro] DATETIME NOT NULL DEFAULT GETDATE(),
    [id_tecnico] INT NOT NULL,
    [estado] NVARCHAR(20) NOT NULL DEFAULT 'registrado' CHECK ([estado] IN ('registrado', 'en_revision', 'aprobado', 'rechazado')),
    [id_coordinador_asignado] INT NULL,
    [fecha_revision] DATETIME,
    [fecha_aprobacion] DATETIME,
    [fecha_rechazo] DATETIME,
    [razon_de_rechazo] NVARCHAR(MAX),
    [fecha_modificacion] DATETIME DEFAULT GETDATE(),
	[expediente_activo] BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE [Indicios] (
    [id_indicio] INT IDENTITY PRIMARY KEY,
    [id_expediente] INT NOT NULL,
    [no_indicio] NVARCHAR(50) NOT NULL,
    [nombre_indicio] NVARCHAR(100) NOT NULL,
    [descripcion] NVARCHAR(MAX),
    [color] NVARCHAR(50),
    [tamaño] DECIMAL(10,2),
    [peso] DECIMAL(10,3),
    [unidad_peso] NVARCHAR(10) DEFAULT 'Kg',
    [ubicacion] NVARCHAR(200),
    [observaciones] NVARCHAR(MAX),
    [fecha_registro] DATETIME DEFAULT GETDATE(),
    [id_tecnico] INT NOT NULL,
    CONSTRAINT UQ_Indicio_Expediente UNIQUE ([id_expediente], [no_indicio])
);
GO

CREATE TABLE [Auditoria_acciones] (
    [id_auditoria] INT IDENTITY PRIMARY KEY,
    [tabla_afectada] NVARCHAR(50) NOT NULL,
    [id_registro_afectado] INT NOT NULL,
    [accion] NVARCHAR(20) NOT NULL CHECK([accion] IN ('INSERT', 'UPDATE', 'DELETE')),
    [valores_anterior] NVARCHAR(MAX),
    [valores_nuevos] NVARCHAR(MAX),
    [id_usuario] INT NOT NULL,
    [fecha_accion] DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE [Estados_expedientes] (
    [id_estado] INT IDENTITY PRIMARY KEY,
    [id_expediente] INT NOT NULL,
    [estado_anterior] NVARCHAR(20),
    [estado_nuevo] NVARCHAR(20) NOT NULL,
    [fecha_cambio] DATETIME DEFAULT GETDATE(),
    [id_usuario_cambio] INT NOT NULL
);
GO

CREATE TABLE [reportes_generados] (
    [id_reporte] INT IDENTITY PRIMARY KEY,
    [tipo_reporte] NVARCHAR(50) NOT NULL,
    [parametro_filtro] NVARCHAR(MAX),
    [fecha_generacion] DATETIME DEFAULT GETDATE(),
    [id_usuario_generador] INT NOT NULL,
    [nombre_archivo] NVARCHAR(100)
);
GO

-- Relaciones (FOREIGN KEYS)
ALTER TABLE [Expedientes]
ADD FOREIGN KEY([id_tecnico]) REFERENCES [Usuarios]([id_usuario]);
GO
ALTER TABLE [Expedientes]
ADD FOREIGN KEY([id_coordinador_asignado]) REFERENCES [Usuarios]([id_usuario]);
GO
ALTER TABLE [Indicios]
ADD FOREIGN KEY([id_expediente]) REFERENCES [Expedientes]([id_expediente]);
GO
ALTER TABLE [Indicios]
ADD FOREIGN KEY([id_tecnico]) REFERENCES [Usuarios]([id_usuario]);
GO
ALTER TABLE [Auditoria_acciones]
ADD FOREIGN KEY([id_usuario]) REFERENCES [Usuarios]([id_usuario]);
GO
ALTER TABLE [Estados_expedientes]
ADD FOREIGN KEY([id_expediente]) REFERENCES [Expedientes]([id_expediente]);
GO
ALTER TABLE [Estados_expedientes]
ADD FOREIGN KEY([id_usuario_cambio]) REFERENCES [Usuarios]([id_usuario]);
GO
ALTER TABLE [reportes_generados]
ADD FOREIGN KEY([id_usuario_generador]) REFERENCES [Usuarios]([id_usuario]);
GO


-- creacion de sp
-- Insertar usuario
CREATE OR ALTER PROCEDURE sp_InsertarUsuario
    @usuario NVARCHAR(25),
    @nombres NVARCHAR(50),
    @apellidos NVARCHAR(50),
    @email NVARCHAR(100),
    @telefono NVARCHAR(20),
    @tipo NVARCHAR(20),
    @password_hash NVARCHAR(255)
AS
BEGIN
    INSERT INTO Usuarios (usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario, password_hash)
    VALUES (@usuario, @nombres, @apellidos, @email, @telefono, @tipo, @password_hash)
END
GO

-- actualizar usuario
CREATE OR ALTER PROCEDURE sp_actualizarUsuario
    @id_usuario INT,
    @usuario NVARCHAR(25),
    @nombres NVARCHAR(50),
    @apellidos NVARCHAR(50),
    @email NVARCHAR(100),
    @telefono NVARCHAR(20),
    @tipo NVARCHAR(20)
AS
BEGIN
    UPDATE Usuarios
    SET usuario = @usuario,
        nombres_de_usuario = @nombres,
        apellidos_de_usuario = @apellidos,
        email = @email,
        telefono = @telefono,
        tipo_de_usuario = @tipo
    WHERE id_usuario = @id_usuario
END
GO


-- Consultar usuarios activos
CREATE or ALTER PROCEDURE sp_ConsultarUsuarios
AS
BEGIN
    SELECT * FROM Usuarios where usuario_activo = 1
END
GO
-- buscar usuario por id
CREATE or ALTER PROCEDURE sp_buscarUsuario
 @id_usuario INT
AS
BEGIN
    SELECT * FROM Usuarios where id_usuario = @id_usuario;
END
GO



-- eliminar usuarios
CREATE OR ALTER PROCEDURE sp_DesactivarUsuario
    @id_usuario INT
AS
BEGIN
    UPDATE Usuarios
    SET usuario_activo = 0
    WHERE id_usuario = @id_usuario;
END
GO




-- Insertar expediente
CREATE  or alter PROCEDURE sp_InsertarExpediente
    @no_expediente NVARCHAR(50),
    @titulo NVARCHAR(50),
    @descripcion NVARCHAR(MAX),
    @id_tecnico INT
AS
BEGIN
    INSERT INTO Expedientes (no_expediente, Titulo, descripcion, id_tecnico)
    VALUES (@no_expediente, @titulo, @descripcion, @id_tecnico)
END
GO

-- Consultar expedientes (todos)
CREATE OR ALTER PROCEDURE sp_ConsultarExpedientes
AS
BEGIN
    SELECT * FROM Expedientes where expediente_activo = 1
END
GO

-- buscar expediente
CREATE OR ALTER PROCEDURE sp_BuscarExpedientePorId
    @id_expediente INT
AS
BEGIN
    SELECT * FROM Expedientes WHERE id_expediente = @id_expediente
END
GO




-- Aprobar expediente
CREATE or ALTER PROCEDURE sp_AprobarExpediente
    @id_expediente INT,
    @id_coordinador INT
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'aprobado',
        id_coordinador_asignado = @id_coordinador,
        fecha_aprobacion = GETDATE(),
        fecha_revision = GETDATE()
    WHERE id_expediente = @id_expediente
END
GO

-- Rechazar expediente
CREATE OR ALTER PROCEDURE sp_RechazarExpediente
    @id_expediente INT,
    @id_coordinador INT,
    @razon NVARCHAR(MAX)
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'rechazado',
        id_coordinador_asignado = @id_coordinador,
        fecha_revision = GETDATE(),
        fecha_rechazo = GETDATE(),
        razon_de_rechazo = @razon
    WHERE id_expediente = @id_expediente
END
GO

-- actualizar expediente
CREATE OR ALTER PROCEDURE sp_ActualizarExpediente
    @id_expediente INT,
    @no_expediente NVARCHAR(50),
    @titulo NVARCHAR(50),
    @descripcion NVARCHAR(MAX)
AS
BEGIN
    UPDATE Expedientes
    SET no_expediente = @no_expediente,
        Titulo = @titulo,
        descripcion = @descripcion,
        fecha_modificacion = GETDATE()
    WHERE id_expediente = @id_expediente
END
GO


-- eliminar expediente
CREATE OR ALTER PROCEDURE sp_DesactivarExpediente
    @id_expediente INT
AS
BEGIN
    UPDATE Expedientes
    SET expediente_activo = 0
    WHERE id_expediente = @id_expediente;
END
GO





-- Insertar indicio
CREATE PROCEDURE sp_InsertarIndicio
    @id_expediente INT,
    @no_indicio NVARCHAR(50),
    @nombre NVARCHAR(100),
    @descripcion TEXT,
    @color NVARCHAR(50),
    @tamaño DECIMAL(10,2),
    @peso DECIMAL(10,3),
    @unidad_peso NVARCHAR(10),
    @ubicacion NVARCHAR(200),
    @observaciones NVARCHAR(MAX),
    @id_tecnico INT
AS
BEGIN
    INSERT INTO Indicios (id_expediente, no_indicio, nombre_indicio, descripcion, color, tamaño, peso, unidad_peso, ubicacion, observaciones, id_tecnico)
    VALUES (@id_expediente, @no_indicio, @nombre, @descripcion, @color, @tamaño, @peso, @unidad_peso, @ubicacion, @observaciones, @id_tecnico)
END
GO

-- Consultar indicios por expediente
CREATE PROCEDURE sp_ConsultarIndiciosPorExpediente
    @id_expediente INT
AS
BEGIN
    SELECT * FROM Indicios WHERE id_expediente = @id_expediente
END
GO

-- buscar indicio por Id
CREATE OR ALTER PROCEDURE sp_BuscarIndicioPorId
    @id_indicio INT
AS
BEGIN
    SELECT * FROM Indicios WHERE id_indicio = @id_indicio
END
GO

-- actualizar indicio
CREATE OR ALTER PROCEDURE sp_ActualizarIndicio
    @id_indicio INT,
    @nombre NVARCHAR(100),
    @descripcion TEXT,
    @color NVARCHAR(50),
    @tamaño DECIMAL(10,2),
    @peso DECIMAL(10,3),
    @unidad_peso NVARCHAR(10),
    @ubicacion NVARCHAR(200),
    @observaciones NVARCHAR(MAX)
AS
BEGIN
    UPDATE Indicios
    SET nombre_indicio = @nombre,
        descripcion = @descripcion,
        color = @color,
        tamaño = @tamaño,
        peso = @peso,
        unidad_peso = @unidad_peso,
        ubicacion = @ubicacion,
        observaciones = @observaciones
    WHERE id_indicio = @id_indicio
END
GO


-- eliminar indicio
CREATE PROCEDURE sp_EliminarIndicio
    @id_indicio INT
AS
BEGIN
    DELETE FROM Indicios WHERE id_indicio = @id_indicio;
END
GO


-- Reporte de expedientes por estado y fechas
CREATE PROCEDURE sp_ReporteExpedientesPorEstadoYFecha
    @estado NVARCHAR(20),
    @fecha_inicio DATETIME,
    @fecha_fin DATETIME
AS
BEGIN
    SELECT * FROM Expedientes
    WHERE estado = @estado
      AND fecha_registro BETWEEN @fecha_inicio AND @fecha_fin
END
GO




-- Trigger de auditoría para Expedientes (INSERT y UPDATE)
CREATE TRIGGER trg_AuditoriaExpedientes
ON Expedientes
AFTER INSERT, UPDATE
AS
BEGIN
    INSERT INTO Auditoria_acciones (
        tabla_afectada, id_registro_afectado, accion, valores_nuevos, id_usuario, fecha_accion
    )
    SELECT
        'Expedientes',
        i.id_expediente,
        CASE WHEN EXISTS (SELECT * FROM deleted WHERE id_expediente = i.id_expediente) THEN 'UPDATE' ELSE 'INSERT' END,
        CONVERT(NVARCHAR(MAX), (SELECT * FROM inserted WHERE id_expediente = i.id_expediente FOR JSON AUTO)),
        i.id_tecnico,
        GETDATE()
    FROM inserted i
END
GO

-- trigger para registrar historial de cambio en expedientes
CREATE OR ALTER TRIGGER trg_HistorialEstadosExpedientes
ON Expedientes
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Estados_expedientes (
        id_expediente,
        estado_anterior,
        estado_nuevo,
        fecha_cambio,
        id_usuario_cambio
    )
    SELECT
        d.id_expediente,
        d.estado,
        i.estado,
        GETDATE(),
        -- El usuario que hizo el cambio (ajusta según tu lógica)
        ISNULL(i.id_coordinador_asignado, i.id_tecnico)
    FROM inserted i
    INNER JOIN deleted d ON i.id_expediente = d.id_expediente
    WHERE i.estado <> d.estado;
END
GO




-- VISTA DE EXPEDIENTE
CREATE or ALTER VIEW vw_ExpedientesConIndicios AS
SELECT
    e.id_expediente,
    e.no_expediente,
    e.Titulo,
    e.estado,
    e.fecha_registro,
    e.fecha_aprobacion,
    e.fecha_rechazo,
    e.razon_de_rechazo,
    COUNT(i.id_indicio) AS total_indicios
FROM Expedientes e
LEFT JOIN Indicios i ON e.id_expediente = i.id_expediente
GROUP BY
    e.id_expediente,
    e.no_expediente,
    e.Titulo,
    e.estado,
    e.fecha_registro,
    e.fecha_aprobacion,
    e.fecha_rechazo,
    e.razon_de_rechazo
GO

-- VISTA ESTADISTICAS
CREATE VIEW vw_EstadisticasExpedientes AS
SELECT
    estado,
    COUNT(*) AS total,
    YEAR(fecha_registro) AS anio,
    MONTH(fecha_registro) AS mes
FROM Expedientes
GROUP BY estado, YEAR(fecha_registro), MONTH(fecha_registro)
GO

-- Usuario técnico predeterminado
IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE usuario = 'tecnico')
BEGIN
    INSERT INTO Usuarios (usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario, password_hash)
    VALUES ('tec', 'Tec', 'Prueba', 'admin@dicri.gob.gt', '5551112222', 'tecnico', '$2a$12$mu60RJ8aQXBkaD9PCq5QT.LmWyuZ.qLcwhOuWSv/JEjBirRF9ieRW') -- tec123
END
GO

-- Usuario coordinador predeterminado
IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE usuario = 'coordinador')
BEGIN
    INSERT INTO Usuarios (usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario, password_hash)
    VALUES ('cord', 'Coordinador', 'Prueba', 'coordinador@dicri.gob.gt', '5553334444', 'coordinador', '$2a$12$tH5rC68R76ez2vQQMTGbW.eTriNtm6By73slfqo3QR/BiJ4ZtODOq') -- coord123
END
GO

-- Usuario administrador predeterminado
IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE usuario = '')
BEGIN
    INSERT INTO Usuarios (usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario, password_hash)
    VALUES ('admin', 'Coordinador', 'Prueba', 'coordinador@dicri.gob.gt', '5553334444', 'Administrador', '$2a$12$HXSZ0tILmSutV0X/l.pR3O4ac/03Cgc4BH38YN3Id800Zl2Jr2NFa') -- admin123
END
GO

-- Insertar expediente con el técnico creado
INSERT INTO Expedientes (no_expediente, Titulo, descripcion, id_tecnico)
VALUES ('EXP0081', 'Robo en Zona 1', N'Expediente de robo a comercio', 1);

-- Insertar indicios para el expediente
INSERT INTO Indicios (id_expediente, no_indicio, nombre_indicio, descripcion, color, tamaño, peso, unidad_peso, ubicacion, observaciones, id_tecnico)
VALUES (15, 'IND001', 'Cuchillo', N'Cuchillo encontrado en la escena', 'Plateado', 20.5, 0.25, 'Kg', 'Mesa principal', N'Sin huellas visibles', 1);

INSERT INTO Indicios (id_expediente, no_indicio, nombre_indicio, descripcion, color, tamaño, peso, unidad_peso, ubicacion, observaciones, id_tecnico)
VALUES (15, 'IND002', 'Guante', N'Guante de látex azul', 'Azul', 15.0, 0.05, 'Kg', 'Silla', N'Posible rastro de sangre', 1);

-- Aprobar expediente (por el coordinador)
UPDATE Expedientes
SET estado = 'aprobado',
    id_coordinador_asignado = 2,
    fecha_aprobacion = GETDATE()
WHERE id_expediente = 1;

-- O bien, rechazar expediente (descomenta si quieres probar rechazo)
 UPDATE Expedientes
 SET estado = 'rechazado',
     id_coordinador_asignado = 2,
     fecha_rechazo = GETDATE(),
     razon_de_rechazo = N'Faltan fotografías de la evidencia'
 WHERE id_expediente = 1;

-- CONSULTAS DE PRUEBA
-- Consultar todos los usuarios
EXEC dbo.sp_ConsultarUsuarios

-- Consultar todos los expedientes
EXEC dbo.sp_ConsultarExpedientes

-- Consultar todos los indicios del expediente 1
SELECT * FROM Indicios WHERE id_expediente = 1;

-- Consultar vista de expedientes con indicios
SELECT * FROM dbo.vw_ExpedientesConIndicios;

-- Consultar estadísticas por estado
SELECT * FROM dbo.vw_EstadisticasExpedientes;

-- Consultar acciones auditadas
SELECT * FROM Auditoria_acciones;

UPDATE Expedientes
SET estado = 'aprobado', id_coordinador_asignado = 2
WHERE id_expediente = 1;

-- validar historial de estados
SELECT * FROM Estados_expedientes WHERE id_expediente = 1;

-- Prueba: Eliminar un indicio
EXEC dbo.sp_EliminarIndicio @id_indicio = 1;

-- prueba: desactivar usuario
EXEC dbo.sp_DesactivarUsuario @id_usuario = 2;
SELECT * FROM Usuarios WHERE usuario_activo = 1;

-- prueba: inhabilitar expediente
EXEC sp_DesactivarExpediente @id_expediente = 1;
SELECT * FROM Expedientes WHERE expediente_activo = 1;
 