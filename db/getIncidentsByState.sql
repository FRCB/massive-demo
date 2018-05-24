SELECT incidents.id, state, injuries.name AS injury, affectedareas.name AS affectedarea, causes.name AS cause
FROM incidents 
JOIN injuries ON incidents.injuryid = injuries.id 
JOIN affectedareas ON affectedareas.id = injuries.affectedareaid 
JOIN causes ON causes.id = incidents.causeid
WHERE state = ${state}