SELECT 
	cam.bron,
	cam.gemeente,
	cam.type,
	cam.eigenaar,
	cam.geom,
	ISOVIST(cam.geom, ARRAY(
		SELECT ST_Transform(ST_Force2D(pand.geovlak), 4326)
		FROM bag.pand 
		WHERE ST_Intersects(ST_Buffer(ST_Transform(cam.geom,28992),25), pand.geovlak)
	),25,36,-999,360) as viewshed
FROM cameras as cam