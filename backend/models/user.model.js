module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: {
          type: String,
          required: [true, "Please enter user name"] 
        },
        role: {
          type: String,
          required: [true, "Please enter user's role"] 
        },
        online_status: {
          type: Boolean,
          required: false
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema); // Capitalize model name
  
    return User;
  };
  