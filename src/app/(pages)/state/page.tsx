const AllCities = [
  "Ada",
  "Altus",
  "Alva",
  "Ardmore",
  "Bartlesville",
  "Bethany",
  "Boise City",
  "Broken Arrow",
  "Cache",
  "Catoosa",
  "Chandler",
  "Checotah",
  "Chickasha",
  "Choctaw",
  "Claremore",
  "Clinton",
  "Cushing",
  "Del City",
  "Duncan",
  "Durant",
  "Edmond",
  "El Reno",
  "Elk City",
  "Enid",
  "Eufaula",
  "Fairfax",
  "Fairland",
  "Fairview",
  "Fort Gibson",
  "Fort Supply",
  "Fort Towson",
  "Frederick",
  "Gage",
  "Geary",
  "Glencoe",
  "Goodwell",
  "Grove",
  "Guthrie",
  "Guymon",
  "Haileyville",
  "Hallett",
  "Hammon",
  "Hartshorne",
  "Healdton",
  "Henryetta",
  "Hollis",
  "Hollister",
  "Hooker",
  "Hugo",
  "Idabel",
  "Inola",
  "Jay",
  "Jenks",
  "Jennings",
  "Jones",
  "Kansas",
  "Kaw City",
  "Kingfisher",
  "Kingston",
  "Krebs",
  "Lahoma",
  "Laverne",
  "Lawton",
  "Lehigh",
  "Lindsay",
  "Loco",
  "Locust",
  "Lone Wolf",
  "Lion",
  "Lookeba",
  "Lore City",
  "Luther",
  "Madill",
  "Mangum",
  "Manitou",
  "Marble City",
  "Marlow",
  "Marshall",
  "Maud",
  "Meade",
  "Miami",
  "Milburn",
  "Mill Creek",
  "Millerton",
  "Minco",
  "Moffitt",
  "Moore",
  "Moorhead",
  "Moundsville",
  "Mountain View",
  "Mulberry",
  "Mulhall",
  "Muskogee",
  "Mustang",
  "Mutual",
  "Nardin",
  "Newcastle",
  "Newkirk",
  "Noble",
  "Norman",
  "North Enid",
  "North Miami",
  "North Richland Hills",
  "Notre",
  "Nowata",
  "Oakdale",
  "Oakland",
  "Oakwood",
  "Ochelata",
  "Oilton",
  "Oklahoma City",
  "Okemah",
  "Oklahoma",
  "Oologah",
  "Oregon Trail",
  "Ottawa",
  "Owasso",
  "Ozark",
  "Paden",
  "Palm Valley",
  "Panama",
  "Park Hill",
  "Pauls Valley",
  "Pawhuska",
  "Pecan",
  "Perry",
  "Perryton",
  "Petersburg",
  "Piedmont",
];

const formatStateName = (state: string) => {
  return state
    .split(/[-\s]/) // split by dash or space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const StatePage = async () => {
  // const { name } = await params;

  return (
    <main>
      <div className="container xl:max-w-6xl mx-auto px-5 pt-5">
        <div className="py-10 space-y-10">
          <div className="space-y-5 text-center">
            <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
              Painting Contractors in {formatStateName("oklahoma")}
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              vel esse hic vitae cum! Minus magni iure vel aspernatur nemo
              dolore placeat quod veritatis. Et aperiam inventore in. Accusamus,
              corrupti?
            </p>
          </div>
          <div className="columns-3">
            {AllCities.map((city) => (
              <p
                key={city}
                className="text-center text-[16px] font-medium font-poppins">
                {city}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default StatePage;
