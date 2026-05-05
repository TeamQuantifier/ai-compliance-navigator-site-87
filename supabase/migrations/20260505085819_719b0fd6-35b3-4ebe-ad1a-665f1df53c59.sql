CREATE OR REPLACE FUNCTION pg_temp.demote_h1(node jsonb) RETURNS jsonb AS $$
DECLARE
  result jsonb;
  k text;
  v jsonb;
  arr jsonb;
  item jsonb;
BEGIN
  IF node IS NULL THEN RETURN node; END IF;

  IF jsonb_typeof(node) = 'object' THEN
    result := node;
    -- Demote heading level 1 -> 2
    IF result->>'type' = 'heading' AND (result->'attrs'->>'level') = '1' THEN
      result := jsonb_set(result, '{attrs,level}', '2'::jsonb);
    END IF;
    -- Recurse into all values
    FOR k, v IN SELECT * FROM jsonb_each(result) LOOP
      result := jsonb_set(result, ARRAY[k], pg_temp.demote_h1(v));
    END LOOP;
    RETURN result;
  ELSIF jsonb_typeof(node) = 'array' THEN
    arr := '[]'::jsonb;
    FOR item IN SELECT * FROM jsonb_array_elements(node) LOOP
      arr := arr || jsonb_build_array(pg_temp.demote_h1(item));
    END LOOP;
    RETURN arr;
  ELSE
    RETURN node;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

UPDATE posts
SET body_rich = pg_temp.demote_h1(body_rich), updated_at = now()
WHERE id IN (
  '70350bee-c617-417b-8771-4f925d3e3694',
  '1a90dd06-0433-401d-baf7-fdf40fb6dace',
  '9d8ab442-61d1-42d9-8e41-7d61e4ff3286',
  '72fcf7e8-901a-4875-8c21-9056444018df',
  '2d2f3923-513d-48fd-b7ad-1f49633b7f7c',
  '632d8856-2db7-46ab-8f30-f6a9872fe7b8',
  '62e81936-3615-42cd-b003-0538da49ffa2',
  'bc8c2a54-fc7e-4c68-9664-fa1095d99082',
  '3c4d2750-fd7e-4f08-9c79-39c53a8c1923'
);