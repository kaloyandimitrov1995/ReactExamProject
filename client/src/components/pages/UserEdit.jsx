export default function UserEdit(){
    return (
    <section>
      <h2>Edit Profile</h2>
        <label>
          Short Bio
          <textarea name="bio" rows="4" value={"TEXT"} />
        </label>
    </section>
  );
}