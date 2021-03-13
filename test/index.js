const getFavicons = require("../")
const expect = require("chai").expect

describe("getFavicons", () => {
    it("should return an array for a well-known address", async () => {
        const url = "https://www.github.com"

        let result, err
        try {
            result = await getFavicons(url)
        } catch (_err) {
            err = _err
        }
        expect(result.icons).to.be.an('array')
        expect(result.icons).to.be.not.empty
        expect(err).to.be.undefined
    })

    it("should throw an error for a garbage address", async () => {
        const url = "https://www.agikjosahgsafdlkjwahejklsahfgjklahfgjhoaeuhjaksfdngaewhrgopasjngklm.com"

        let result, err
        try {
            result = await getFavicons(url)
        } catch (_err) {
            err = _err
        }
        expect(result).to.be.undefined
        expect(err).to.be.instanceof(Error)
    })

})
