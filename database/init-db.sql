DROP SCHEMA IF EXISTS civity_imp CASCADE;
CREATE SCHEMA IF NOT EXISTS civity_imp;
DROP SCHEMA IF EXISTS civity CASCADE;
CREATE SCHEMA IF NOT EXISTS civity;

CREATE TABLE civity.cameras (
    id character varying NOT NULL,
    bron character varying,
    doel character varying,
    eigenaar character varying,
    kijkrichting character varying,
    camera_type character varying,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    geom public.geometry(Point,4326),
    CONSTRAINT cameras_pkey PRIMARY KEY (id)
);

CREATE INDEX cameras_gdx ON civity.cameras USING GIST (geom);
