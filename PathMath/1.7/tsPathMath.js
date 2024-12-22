
/* global TestSuite PathMath */
on('ready',()=>{
  let tc = new TestSuite("PathMath");
  let check = tc.check;
  let page = findObjs({type:'page',name:"Start"})[0];

  const prereqs = [
    () => {
      return page && "undefined" !== typeof PathMath;
    },
    `Requires Page named "Start" and PathMath object.`
  ];

  tc.prereq(...prereqs)
    .addTest("createCircleData (path)",(assert)=>{
      let o = PathMath.createCircleData(70);
      let p = createObj("path",{
        ...o,
        pageid: page.id,
        layer: 'objects',
        left:135,
        top: 135
      });
      assert(p,"Able to create Circle path object from results of createCircleData");

      p?.remove();
  });


  tc.prereq(...prereqs)
    .addTest("toSegments:rec",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 70,
        height: 70,
        path: `[["M",0,0],["L",0,70],["L",70,70],["L",70,0],["L",0,0]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "rec",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[70,70]]"
      });

      let s = PathMath.toSegments(p);
      let s2 = PathMath.toSegments(pv2);
      
      assert(check.areEqual(s,s2),"Same segments are returned for path or pathv2 representation [Rectangle].");

      p?.remove();
      pv2?.remove();
  });
  tc.prereq(...prereqs)
    .addTest("toSegments:eli",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 35,
        top: 35,
        width: 70,
        height: 70,
        path: `[["M",0,35],["C",0,15.670031999999999,15.670031999999999,0,35,0],["C",54.329968,0,70,15.670031999999999,70,35],["C",70,54.329968,54.329968,70,35,70],["C",15.670031999999999,70,0,54.329968,0,35],["Z"]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "eli",
        x: 35,
        y: 35,
        points: "[[0,0],[70,70]]"
      });

      let s = PathMath.toSegments(p);
      let s2 = PathMath.toSegments(pv2);

      assert( s.length > 20, "Sufficent points are returned for path version. [Ellipse].");
      assert( s2.length > 20, "Sufficent points are returned for pathv2 version. [Ellipse].");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("toSegments:poly",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 135,
        height: 135,
        path: `[["M",0,0],["L",70,70],["L",70,135],["L",135,70]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "pol",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[70,70],[70,135],[135,70]]"
      });

      let s = PathMath.toSegments(p);
      let s2 = PathMath.toSegments(pv2);
      
      assert(check.areEqual(s,s2),"Same segments are returned for path or pathv2 representation.[Polygon]");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("toSegments:free",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 70,
        height: 70,
        path: `[["M",0,0],["Q",0,0,5,7],["Q",0,0,12,3],["Q",0,0,23,23],["Q",0,0,38,27],["Q",0,0,45,33],["Q",0,0,56,40],["Q",0,0,60,50],["Q",0,0,70,70]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "free",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[5,7],[12,3],[23,23],[38,27],[45,33],[56,40],[60,50],[70,70]]"
      });

      let s = PathMath.toSegments(p);
      let s2 = PathMath.toSegments(pv2);

      assert(check.areEqual(s,s2),"Same segments are returned for path or pathv2 representation.[Free]");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("getBoundingBox:poly",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 135,
        height: 135,
        path: `[["M",0,0],["L",70,70],["L",70,135],["L",135,70]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "pol",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[70,70],[70,135],[135,70]]"
      });

      let bb = PathMath.getBoundingBox(p);
      let bb2 = PathMath.getBoundingBox(pv2);
      
      assert(check.areEqual(bb,bb2),"Same bounding boxes are returned for path or pathv2 representation.");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("getBoundingBox:rec",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 70,
        height: 70,
        path: `[["M",0,0],["L",0,70],["L",70,70],["L",70,0],["L",0,0]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "rec",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[70,70]]"
      });

      let bb = PathMath.getBoundingBox(p);
      let bb2 = PathMath.getBoundingBox(pv2);
      
      assert(check.areEqual(bb,bb2),"Same bounding boxes are returned for path or pathv2 representation.");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("getBoundingBox:eli",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 35,
        top: 35,
        width: 70,
        height: 70,
        path: `[["M",0,35],["C",0,15.670031999999999,15.670031999999999,0,35,0],["C",54.329968,0,70,15.670031999999999,70,35],["C",70,54.329968,54.329968,70,35,70],["C",15.670031999999999,70,0,54.329968,0,35],["Z"]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "eli",
        x: 35,
        y: 35,
        points: "[[0,0],[70,70]]"
      });

      let bb = PathMath.getBoundingBox(p);
      let bb2 = PathMath.getBoundingBox(pv2);

      assert(check.areEqual(bb,bb2),"Same bounding boxes are returned for path or pathv2 representation.");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("getBoundingBox:free",(assert)=>{
      let p = createObj('path',{
        layer: "objects",
        pageid: page.id,
        left: 65.5,
        top: 65.5,
        width: 70,
        height: 70,
        path: `[["M",0,0],["Q",0,0,5,7],["Q",0,0,12,3],["Q",0,0,23,23],["Q",0,0,38,27],["Q",0,0,45,33],["Q",0,0,56,40],["Q",0,0,60,50],["Q",0,0,70,70]]`
      });
      let pv2 = createObj('pathv2',{
        layer: "objects",
        pageid: page.id,
        shape: "free",
        x: 65.5,
        y: 65.5,
        points: "[[0,0],[5,7],[12,3],[23,23],[38,27],[45,33],[56,40],[60,50],[70,70]]"
      });

      let bb = PathMath.getBoundingBox(p);
      let bb2 = PathMath.getBoundingBox(pv2);
      
      assert(check.areEqual(bb,bb2),"Same bounding boxes are returned for path or pathv2 representation.");

      p?.remove();
      pv2?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("Circle Class",(assert)=>{

      let c = new PathMath.Circle([70,70],70);

      let p = c.render(page.id,"objects",{});
      
      assert(p,"Circle object can render a pathv2 object.");
      assert(p?.get("type") === 'pathv2',"Circle object is pathv2 type.");

      p?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("Polygon Class",(assert)=>{

      let c = new PathMath.Polygon([[70,70],[35,35],[70,35],[35,70]]);

      let p = c.render(page.id,"objects",{});
      
      assert(p,"Polygon object can render a pathv2 object.");
      assert(p?.get("type") === 'pathv2',"Polygon object is pathv2 type.");

      p?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("Path Class",(assert)=>{

      let c = new PathMath.Path([[70,70],[35,35],[70,35],[35,70]]);

      let p = c.render(page.id,"objects",{});
      
      assert(p,"Path object can render a pathv2 object.");
      assert(p?.get("type") === 'pathv2',"Path object is pathv2 type.");

      p?.remove();
  });

  tc.prereq(...prereqs)
    .addTest("Triangle Class",(assert)=>{

      let c = new PathMath.Triangle([[70,70],[135,35],[70,35]]);

      let p = c.render(page.id,"objects",{});
      
      assert(p,"Triangle object can render a pathv2 object.");
      assert(p?.get("type") === 'pathv2',"Triangle object is pathv2 type.");

      p?.remove();
  });
  


});
