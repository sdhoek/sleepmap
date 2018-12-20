SELECT 
	cam.id,
	cam.bron,
	cam.gemeente,
	cam.type,
	cam.eigenaar,
	cam.geom,
	(
		SELECT ST_Transform(ST_ClosestPoint(ST_ExteriorRing(pand.geovlak), ST_Transform(cam.geom,28992)), 4326)
    	FROM bag.pand as pand 
    	WHERE ST_Within(ST_Transform(cam.geom,28992), pand.geovlak)
    	ORDER BY ST_Transform(cam.geom,28992) <-> ST_ExteriorRing(pand.geovlak)
    	LIMIT 1
	) as closespointonpandgeom,
	ST_Transform(ST_Force2D(pand.geovlak), 4326) as pandgeom
FROM cameras as cam
INNER JOIN bag.pand as pand ON ST_Within(ST_Transform(cam.geom,28992), pand.geovlak)