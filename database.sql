-- =====================================================
-- MIGRACIONES DE BASE DE DATOS SUPABASE
-- =====================================================
-- 
-- Script SQL para crear todas las tablas del sistema
-- Ejecutar en el SQL Editor de Supabase

-- =====================================================
-- EXTENSIONES
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: modelos
-- =====================================================

CREATE TABLE IF NOT EXISTS modelos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id VARCHAR(20) UNIQUE NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  contacto VARCHAR(200),
  apps_selected TEXT[] DEFAULT '{}',
  app_handle_whatsapp VARCHAR(100),
  app_handle_telegram VARCHAR(100),
  app_handle_teams VARCHAR(100),
  app_handle_instagram VARCHAR(100),
  app_handle_snapchat VARCHAR(100),
  app_handle_otra VARCHAR(100),
  app_otra_nombre VARCHAR(100),
  extras_videollamadas TEXT[] DEFAULT '{}',
  extras_custom TEXT[] DEFAULT '{}',
  extras_generales TEXT,
  aprobado BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT FALSE,
  eliminado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: servicios_precios
-- =====================================================

CREATE TABLE IF NOT EXISTS servicios_precios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  modelo_id UUID REFERENCES modelos(id) ON DELETE CASCADE,
  
  -- Videollamadas
  videocall_5min INTEGER DEFAULT 0,
  videocall_10min INTEGER DEFAULT 0,
  videocall_15min INTEGER DEFAULT 0,
  
  -- Videos personalizados
  custom_video_5m INTEGER DEFAULT 0,
  custom_video_10m INTEGER DEFAULT 0,
  custom_video_15m INTEGER DEFAULT 0,
  
  -- Extras
  fotos_personalizadas_1 INTEGER DEFAULT 0,
  fotos_personalizadas_3 INTEGER DEFAULT 0,
  bg_personalizado INTEGER DEFAULT 0,
  panties INTEGER DEFAULT 0,
  
  -- Contenido XXX
  sola_vaginal INTEGER DEFAULT 0,
  sola_anal INTEGER DEFAULT 0,
  sola_squirt INTEGER DEFAULT 0,
  bg_boy_girl INTEGER DEFAULT 0,
  bg_boy_girl_anal INTEGER DEFAULT 0,
  lesbian INTEGER DEFAULT 0,
  orgia INTEGER DEFAULT 0,
  bbc INTEGER DEFAULT 0,
  trio_2_chicos_1_chica INTEGER DEFAULT 0,
  lives INTEGER DEFAULT 0,
  estrenos INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: chatters
-- =====================================================

CREATE TABLE IF NOT EXISTS chatters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  chatter_id VARCHAR(20) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  fullname VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  model_ids TEXT[] DEFAULT '{}',
  model_names TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: tickets
-- =====================================================

CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ticket_id VARCHAR(50) UNIQUE NOT NULL,
  modelo_id UUID REFERENCES modelos(id) ON DELETE CASCADE,
  chatter_id UUID REFERENCES chatters(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  price INTEGER,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  priority VARCHAR(10) DEFAULT 'medium',
  deadline TIMESTAMP WITH TIME ZONE,
  client_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: etiquetas
-- =====================================================

CREATE TABLE IF NOT EXISTS etiquetas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: modelo_etiquetas
-- =====================================================

CREATE TABLE IF NOT EXISTS modelo_etiquetas (
  modelo_id UUID REFERENCES modelos(id) ON DELETE CASCADE,
  etiqueta_id UUID REFERENCES etiquetas(id) ON DELETE CASCADE,
  PRIMARY KEY (modelo_id, etiqueta_id)
);

-- =====================================================
-- TABLA: ticket_audit
-- =====================================================

CREATE TABLE IF NOT EXISTS ticket_audit (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  old_values JSONB,
  new_values JSONB,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES
-- =====================================================

-- Índices para modelos
CREATE INDEX IF NOT EXISTS idx_modelos_profile_id ON modelos(profile_id);
CREATE INDEX IF NOT EXISTS idx_modelos_aprobado ON modelos(aprobado);
CREATE INDEX IF NOT EXISTS idx_modelos_activo ON modelos(activo);
CREATE INDEX IF NOT EXISTS idx_modelos_eliminado ON modelos(eliminado);

-- Índices para chatters
CREATE INDEX IF NOT EXISTS idx_chatters_username ON chatters(username);
CREATE INDEX IF NOT EXISTS idx_chatters_is_active ON chatters(is_active);

-- Índices para tickets
CREATE INDEX IF NOT EXISTS idx_tickets_modelo_id ON tickets(modelo_id);
CREATE INDEX IF NOT EXISTS idx_tickets_chatter_id ON tickets(chatter_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at);

-- Índices para etiquetas
CREATE INDEX IF NOT EXISTS idx_etiquetas_name ON etiquetas(name);

-- =====================================================
-- FUNCIONES
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_modelos_updated_at 
  BEFORE UPDATE ON modelos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_servicios_precios_updated_at 
  BEFORE UPDATE ON servicios_precios 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at 
  BEFORE UPDATE ON tickets 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE modelos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios_precios ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatters ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE etiquetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE modelo_etiquetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_audit ENABLE ROW LEVEL SECURITY;

-- Políticas para modelos (lectura pública para modelos aprobados y activos)
CREATE POLICY "Modelos públicos" ON modelos
  FOR SELECT USING (aprobado = true AND activo = true AND eliminado = false);

-- Políticas para chatters (solo pueden ver sus propios datos)
CREATE POLICY "Chatters propios" ON chatters
  FOR ALL USING (auth.uid()::text = id::text);

-- Políticas para tickets (chatters solo pueden ver sus tickets)
CREATE POLICY "Tickets de chatter" ON tickets
  FOR ALL USING (
    chatter_id IN (
      SELECT id FROM chatters WHERE auth.uid()::text = id::text
    )
  );

-- Políticas para etiquetas (lectura pública)
CREATE POLICY "Etiquetas públicas" ON etiquetas
  FOR SELECT USING (true);

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar etiquetas iniciales
INSERT INTO etiquetas (name) VALUES 
  ('Nueva'),
  ('Popular'),
  ('VIP'),
  ('Disponible'),
  ('Ocupada')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista de modelos con precios
CREATE OR REPLACE VIEW modelos_con_precios AS
SELECT 
  m.*,
  sp.videocall_5min,
  sp.videocall_10min,
  sp.videocall_15min,
  sp.custom_video_5m,
  sp.custom_video_10m,
  sp.custom_video_15m,
  sp.fotos_personalizadas_1,
  sp.fotos_personalizadas_3,
  sp.bg_personalizado,
  sp.panties,
  sp.sola_vaginal,
  sp.sola_anal,
  sp.sola_squirt,
  sp.bg_boy_girl,
  sp.bg_boy_girl_anal,
  sp.lesbian,
  sp.orgia,
  sp.bbc,
  sp.trio_2_chicos_1_chica,
  sp.lives,
  sp.estrenos
FROM modelos m
LEFT JOIN servicios_precios sp ON m.id = sp.modelo_id;

-- Vista de tickets con información de modelo y chatter
CREATE OR REPLACE VIEW tickets_detallados AS
SELECT 
  t.*,
  m.modelo,
  m.contacto,
  c.username as chatter_username,
  c.fullname as chatter_fullname
FROM tickets t
LEFT JOIN modelos m ON t.modelo_id = m.id
LEFT JOIN chatters c ON t.chatter_id = c.id;

-- =====================================================
-- COMENTARIOS
-- =====================================================

COMMENT ON TABLE modelos IS 'Perfiles de modelos del sistema';
COMMENT ON TABLE servicios_precios IS 'Precios de servicios por modelo';
COMMENT ON TABLE chatters IS 'Usuarios chatter que gestionan modelos';
COMMENT ON TABLE tickets IS 'Sistema de tickets para servicios';
COMMENT ON TABLE etiquetas IS 'Etiquetas para categorizar modelos';
COMMENT ON TABLE modelo_etiquetas IS 'Relación muchos a muchos entre modelos y etiquetas';
COMMENT ON TABLE ticket_audit IS 'Bitácora de cambios en tickets';
