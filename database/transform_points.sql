-- Optimise table

ALTER TABLE civity_imp.cameras DROP COLUMN ogc_fid ;
ALTER TABLE civity_imp.cameras ADD PRIMARY KEY (id);

CREATE INDEX cameras_geohash ON civity_imp.cameras (ST_GeoHash(geom,10) COLLATE "C");
CLUSTER civity_imp.cameras USING cameras_geohash;
DROP INDEX civity_imp.cameras_geohash;
CREATE INDEX cameras_gdx ON civity_imp.cameras USING GIST (geom);

-- Snap cameras on buildings to nearest edge

WITH updatefeatures AS (
    SELECT 
        cam.id,
        (
            SELECT
                ST_Transform(ST_ClosestPoint(ST_ExteriorRing(pand.geovlak), ST_Transform(cam.geom,28992)), 4326)
            FROM
                bag.pandactueelbestaand AS pand 
            WHERE
                ST_Within(ST_Transform(cam.geom,28992), pand.geovlak)
            ORDER BY
                ST_Transform(cam.geom,28992) <-> ST_ExteriorRing(pand.geovlak)
            LIMIT 1
        ) AS closespointonpandgeom
    FROM
        civity_imp.cameras AS cam
    INNER JOIN
        bag.pandactueelbestaand AS pand
    ON
        ST_Within(ST_Transform(cam.geom,28992), pand.geovlak)
)
UPDATE
    civity_imp.cameras
SET
    geom = updatefeatures.closespointonpandgeom
FROM
    updatefeatures
WHERE
    civity_imp.cameras.id = updatefeatures.id;

-- Drop index from full table before insert for speed

DROP INDEX civity.cameras_gdx;

-- Insert new locations into the full table

INSERT INTO
    civity.cameras (id,bron,doel,eigenaar,kijkrichting,camera_type,geom)
SELECT
    id,
    bron,
    doel,
    eigenaar,
    kijkrichting,
    camera_type,
    geom
FROM
    civity_imp.cameras
WHERE
    id NOT IN (SELECT id FROM civity.cameras);

-- Re-oder and put index back on the full table

CREATE INDEX cameras_geohash ON civity.cameras (ST_GeoHash(geom,10) COLLATE "C");
CLUSTER civity.cameras USING cameras_geohash;
DROP INDEX civity.cameras_geohash;
CREATE INDEX cameras_gdx ON civity.cameras USING GIST (geom);

-- Remove import table

DROP TABLE civity_imp.cameras CASCADE;
