import { sceneEvents } from "../events/EventsCenter";

const getablesFactory = (
  scene,
  mapRef,
  layer,
  pointName,
  key,
  frame = null,
  eventName,
  floats,
  scale = null
) => {
  const getablePoints = mapRef.filterObjects(
    layer,
    (obj) => obj.name === pointName
  );

  const items = getablePoints.map((item) =>
    scene.physics.add.sprite(item.x, item.y, key, frame)
  );

  items.forEach((item, index) => {
    item.setPipeline("Light2D");
    scene.physics.add.overlap(scene.player, item, (obj1, obj2) => {
      sceneEvents.emit(eventName, index, obj1, scene.cameras.main);
      obj2.destroy();
    });
    scene.physics.add.collider(item, scene.level1Platforms);
    scene.physics.add.collider(item, scene.oneWayPlatforms);

    if (floats) {
      item.body.setAllowGravity(false);
      scene.tweens.add({
        targets: item,
        y: item.y - 8,
        duration: 1600,
        ease: "Quad.easeInOut",
        repeat: -1,
        repeatDelay: 200,
        hold: 100,
        yoyo: true,
      });

      if (scale) {
        item.setScale(scale);
      }
    }
  });

  return items[0];
};

export default getablesFactory;
