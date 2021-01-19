const getFavicons = require("../");
const expect = require("chai").expect;

describe("getFavicons", () => {
  it("should return a response for a well-known address", (done) => {
    const url = "https://www.github.com";
    getFavicons(url).then((result) => {
      expect(result.icons).to.be.not.empty;
      done();
    });
  }).timeout(10000);

  it("should return an empty list of favicons for a garbage address", (done) => {
    const url =
      "https://www.agikjosahgsafdlkjwahejklsahfgjklahfgjhoaeuhjaksfdngaewhrgopasjngklm.com";

    getFavicons(url).then((result) => {
      expect(result.icons).to.be.an("array");
      expect(result.icons).to.be.empty;
      done();
    });
  });
});
