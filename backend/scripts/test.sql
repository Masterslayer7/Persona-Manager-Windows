INSERT INTO personateams_personateam (id, name)
VALUES (0, 'My Team');

INSERT INTO personateams_teammember (id, team_id, persona_id)
VALUES (0, 0, 0);

UPDATE personateams_teammember
SET persona_id = 1
WHERE team_id = 0;