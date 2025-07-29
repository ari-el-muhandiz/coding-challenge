require './alien'

RSpec.describe AlienLang do
    context "Given list of words sorted in alphabetical order" do
        it "determine the order of the language" do
            alienLang = AlienLang.new(["bca", "aaa", "acb"])
            expect(alienLang.printWord()).to be == "bac"
        end
    end
end